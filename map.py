import pandas as pd
import folium

# the filepath to the .json file that contains all the dataset urls
url_fp: str = "data/metadata/urls.json"

# convert metadata file to dataframe which
url_df: pd.DataFrame = pd.read_json(url_fp)

def get_base_url(year: int, category: str) -> str | None:
    valid_categories: list[str] = ['caractéristiques', 'lieux', 'véhicules', 'usagers']
    valid_years: list[int]= [2017, 2018, 2019, 2020, 2021]

    if year not in valid_years or category not in valid_categories:
        return
    
    # Get year idx as year are in descendant order in metadata file
    year_idx: int = 2021 - year
    return url_df.at[year_idx, category]

v_url: str | None = get_base_url(2021, 'véhicules')
if v_url == None:
    exit(0)

"""
    Only use those columns because
    we only want to extract the accident id from the vehicule category
"""
v_col: list[str] = ['Num_Acc', 'catv']

# convert .csv file to pandas dataframe
v_df: pd.DataFrame = pd.read_csv(v_url, sep=';', usecols=v_col, on_bad_lines='skip')

labels: list[str] = [1, 80]

# filter the dataframe to bycicles only
v_df.query("catv == @labels", inplace=True)

# and then remove all columns but the accident id column
v_df = v_df.filter(items=['Num_Acc'])
# remove the duplicates
v_df.drop_duplicates(inplace=True)

c_url: str | None = get_base_url(year=2021, category='caractéristiques')
if c_url == None:
    exit(0)

"""
    Only use those columns because
    we only want to extract the accident id from the vehicule category
"""
c_col: list[str] = ['lat', 'long']

# convert .csv file to pandas dataframe
c_df: pd.DataFrame = pd.read_csv(c_url, sep=';', usecols=c_col, on_bad_lines='skip')

#######################################

paris_loc = [48.856578, 2.351828]

m = folium.Map(location=paris_loc)

m.save("index.html")