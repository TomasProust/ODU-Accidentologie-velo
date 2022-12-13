import folium

paris_loc = [48.856578, 2.351828]

m = folium.Map(location=paris_loc)

m.save("index.html")