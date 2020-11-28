import json
import spotipy
import spotipy.util as util

with open("musc-taste-data.json") as f:
    data = json.load(f)

rafael = data["Rafael"]
elisson = data["Elisson"]
data = {**elisson,**rafael}

CLIENT_ID = ''
CLIENT_SECRET = ''
SCOPE = 'user-library-read'
USERNAME = ''

token = util.prompt_for_user_token(
	USERNAME,
	SCOPE,
	client_id=CLIENT_ID,
	client_secret=CLIENT_SECRET,
	redirect_uri='https://www.google.com/'
)


sp = spotipy.Spotify(auth=token)

nodes = []
links = []

for artist in data:
	print(artist)
	results = sp.search(q='artist:' + artist,
	                    type='artist', limit=1)
	results = results['artists']['items'][0]

	new_artist = {
		"id": artist,
		"source": "Rafael" if artist in rafael and artist not in elisson else ("Elisson" if artist in elisson and artist not in rafael else "both"),
		"genres": results["genres"],
		"url": results["external_urls"]["spotify"],
		"photo": data[artist]["image"]
	}

	association = []
	for artist2 in data:
		if artist2 == artist:
			continue
		elif len(set(data[artist]["genres"]).intersection(set(data[artist2]["genres"]))) > 0:
			association.append(artist2)
			links.append({
				"source": artist,
				"target": artist2
			})

	new_artist["association"] = association

	nodes.append(new_artist)

graph = {
	"nodes": nodes,
	"links": links
}

print(graph)

with open("dummy-graph-data.json", "+w") as f:
    json.dump(graph, f)
