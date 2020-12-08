import json
import spotipy
import spotipy.util as util


CLIENT_ID = ''
CLIENT_SECRET = ''
SCOPE = 'user-top-read'
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

rafael = sp.current_user_top_artists(limit=50, time_range='short_term')
elisson = sp.current_user_top_artists(limit=50, time_range='long_term')

# print(rafael["items"])
# print("\n\n\n")
# print(elisson["items"])

with open('dummy_spotify_data.json', 'w+') as fp:
    json.dump({"elisson": elisson, "rafael": rafael}, fp)
