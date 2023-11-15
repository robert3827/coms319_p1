import { useState } from 'react';

let nextId = 0;

export default function List() {
    // Name is a state variable hook
  const [name, setName] = useState('');

    //artists is an array holding all of the objects. Things are added each time 
  const [artists, setArtists] = useState([]);

    function addToList() {
            if(artists.includes(name)) {
                let myElement = artists.indexOf(name);
            } else {
                console.log(`Next Id: ${nextId} ArtistName: ${name} `);
                setArtists( [ ...artists, { id: nextId++, name: name }  ]);
            }
            
    }

    function ListArtists() {
        for (var a of artists) {
            console.log(`List Length: ${artists.length} Artist ID: ${a.id} Artist Name: ${a.name}`);
        }
    }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={addToList}
      >Add</button>
      <ul>
        {/* {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))} */}

        <ListArtists />
      </ul>
    </>
  );
}

