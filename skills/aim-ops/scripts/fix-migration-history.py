#!/usr/bin/env python3
"""Realign refinery_schema_history after a fork-build migration renumbering.

ONLY for the documented gotcha (aim-ops upgrade-playbook): the DB was migrated by a fork
branch whose migrations Vn.. were renumbered upstream. Preconditions you must have verified:
  * the renumbered SQL yields the same schema (diff shows only comments/guards);
  * the missing upstream migrations' SQL files are in <sql-dir> (verbatim from the target tag);
  * <checksums.json> maps version -> {name, checksum} as written by the TARGET binary into an
    EMPTY data dir (boot the candidate on an empty dir and read refinery_schema_history).
Run on a clone first. Engine must be stopped when run against production.

Usage: fix-migration-history.py <db> <sql-dir> <checksums.json> --apply V51__a,V52__b,... \
         --replace 51:54,52:55   [--expect-max 52]
  --apply    migration file stems (without .sql) to execute, in order
  --replace  old:new version renames for rows already applied under the fork numbering
"""
import argparse, datetime, json, os, sqlite3, sys

ap = argparse.ArgumentParser()
ap.add_argument("db"); ap.add_argument("sql_dir"); ap.add_argument("checksums")
ap.add_argument("--apply", required=True); ap.add_argument("--replace", required=True)
ap.add_argument("--expect-max", type=int, default=None)
a = ap.parse_args()
cks = json.load(open(a.checksums))
apply = [s for s in a.apply.split(",") if s]
replace = dict(tuple(map(int, p.split(":"))) for p in a.replace.split(",") if p)

c = sqlite3.connect(a.db, isolation_level=None, timeout=30)
c.execute("PRAGMA busy_timeout=30000"); c.execute("PRAGMA foreign_keys=OFF"); c.execute("PRAGMA journal_mode=WAL")
hist = c.execute("select version,name from refinery_schema_history order by version").fetchall()
print("before:", hist[-4:])
mx = hist[-1][0]
if a.expect_max is not None and mx != a.expect_max:
    sys.exit(f"refusing: max applied version is {mx}, expected {a.expect_max}")
for old in replace:
    if old not in dict(hist): sys.exit(f"refusing: version {old} not in history")

for stem in apply:
    sql = open(os.path.join(a.sql_dir, stem + ".sql")).read()
    c.executescript("BEGIN;\n" + sql + "\nCOMMIT;")     # executescript handles triggers (BEGIN..END)
    print("applied", stem)

now = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")
c.execute("BEGIN")
c.execute("DELETE FROM refinery_schema_history WHERE version IN (%s)" % ",".join("?"*len(replace)), list(replace))
target_versions = sorted(int(v) for v in cks if int(v) > min(replace) - 1 or int(v) in replace.values())
for v in sorted(int(v) for v in cks):
    if v <= mx and v not in replace: continue
    e = cks[str(v)]
    c.execute("INSERT OR REPLACE INTO refinery_schema_history(version,name,checksum,applied_on) VALUES(?,?,?,?)", (v, e["name"], e["checksum"], now))
c.execute("COMMIT")
c.execute("PRAGMA foreign_keys=ON")
print("fk violations:", c.execute("PRAGMA foreign_key_check").fetchall()[:5])
print("after:", c.execute("select version,name from refinery_schema_history where version>=? order by version", (min(replace)-1,)).fetchall())
c.execute("PRAGMA wal_checkpoint(TRUNCATE)")
