import type { NextPage } from "next";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  Input,
} from "@chakra-ui/react";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  url: string;
  created: string;
}

const Home: NextPage = () => {
  const [characterName, setCharacterName] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentLink, setCurrentLink] = useState(
    "https://rickandmortyapi.com/api/character"
  );
  const [previousPageLink, setPreviousPageLink] = useState("");
  const [nextPageLink, setNextPageLink] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [detailCharacter, setDetailCharacter] = useState<Character | null>(
    null
  );

  useEffect(() => {
    axios.get(currentLink).then(({ data }) => {
      setPreviousPageLink(data.info.prev);
      setNextPageLink(data.info.next);

      setCharacters(data.results);
    });
  }, [currentLink]);

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(characterName.toLowerCase())
    );
  }, [characterName, characters]);

  return (
    <>
      <div>
        <Input
          type="text"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />

        <div>
          <p>Página: {pageNumber}</p>

          <Button
            type="button"
            disabled={!previousPageLink}
            onClick={() => {
              setCurrentLink(previousPageLink);
              setPageNumber((current) => current - 1);
            }}
          >
            Página Anterior
          </Button>

          <Button
            type="button"
            disabled={!nextPageLink}
            onClick={() => {
              setCurrentLink(nextPageLink);
              setPageNumber((current) => current + 1);
            }}
          >
            Próxima Página
          </Button>
        </div>

        <div className="container">
          {filteredCharacters.map((character) => (
            <div
              key={`character:${character.id}`}
              className="card"
              onClick={() => {
                setDetailCharacter(character);
              }}
            >
              <img src={character.image} alt={character.name} />

              <p className="name">{character.name}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!detailCharacter}
        onClose={() => {
          setDetailCharacter(null);
        }}
      >
        <ModalOverlay />

        <ModalContent>
          {detailCharacter !== null && (
            <ModalBody>
              <img src={detailCharacter?.image} alt={detailCharacter.name} />

              <p>Name: {detailCharacter?.name}</p>
              <p>Gender: {detailCharacter?.gender}</p>
              <p>Species: {detailCharacter?.species}</p>
              <p>Type: {detailCharacter?.type}</p>
              <p>Status: {detailCharacter?.status}</p>

              <div>
                <span>Origin</span> <br />
                <span>Name: {detailCharacter?.origin.name}</span> <br />
                <span>URL: {detailCharacter?.origin.url}</span> <br />
              </div>

              <div>
                <span>Location</span> <br />
                <span>Name: {detailCharacter?.origin.name}</span> <br />
                <span>URL: {detailCharacter?.origin.url}</span> <br />
              </div>

              <p>Image: {detailCharacter?.image}</p>
              <p>URL: {detailCharacter?.url}</p>
              <p>Created: {detailCharacter?.created}</p>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

/**
 * "id": 361,
      "name": "Toxic Rick",
      "status": "Dead",
      "species": "Humanoid",
      "type": "Rick's Toxic Side",
      "gender": "Male",
      "origin": {
        "name": "Alien Spa",
        "url": "https://rickandmortyapi.com/api/location/64"
      },
      "location": {
        "name": "Earth",
        "url": "https://rickandmortyapi.com/api/location/20"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/361.jpeg",
      "episode": [
        "https://rickandmortyapi.com/api/episode/27"
      ],
      "url": "https://rickandmortyapi.com/api/character/361",
      "created": "2018-01-10T18:20:41.703Z"
 */

export default Home;
