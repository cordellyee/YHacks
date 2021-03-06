import csv
import json
import datetime
import requests
import itertools

def get_date(s):
    info = s.split('/')
    month = int(info[0])
    day = int(info[1])
    year = int("20"+info[2])
    return datetime.date(year, month, day)

def get_percent(s):
    st = s.split('%')[0]
    return float(st)

def process_data(r):
    obj = {}
    obj['origin_airport'] = r[0]
    obj['destination_airport'] = r[1]
    with open("Airport_MarketGroup.txt", "r") as amg:

        amg_data = json.load(amg)
        obj['origin_region'] = str(amg_data[r[0]])
        obj['destination_region'] = str(amg_data[r[1]])
    obj['hotel'] = r[2]
    with open("Airport_DestinationType.txt", "r") as adt:
        adt_info = json.load(adt)
        obj['tags[]'] = []
        for tag in adt_info[r[1]]:
            obj['tags[]'].append(str(tag))
    obj['nights'] = int(r[3])
    obj['check_in'] = str(get_date(r[4]))
    obj['check_out'] = str(get_date(r[5]))
    obj['expedia_price'] = float(r[6])
    obj['jetblue_price'] = float(r[7])
    # obj['percent_savings'] = get_percent(r[8])
    return obj

def getData(filename):
    with open(filename, "rU") as csvfile:
        datareader = csv.reader(csvfile)
        for row in datareader:
            if row[0] != "Origin":
                yield row
    return

for row in itertools.islice(getData("big_data.csv"), 0, 100):
    row_info = process_data(row)
    r = requests.post("http://localhost:3000/api/packages", row_info)
