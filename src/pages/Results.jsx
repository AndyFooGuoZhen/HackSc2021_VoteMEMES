import React from 'react';
import { Text, Box, Image, Flex, Center } from '@chakra-ui/react';
import BackHome from '../components/BackHome';
import { db } from '../firebase-config';
import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function Results() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      const memesRef = collection(db, 'memes');
      const q = query(memesRef, orderBy('count', 'desc'), limit(3));
      const querySnapshot = await getDocs(q);
      let memeArr = [];
      querySnapshot.forEach(doc => {
        memeArr = [...memeArr, doc.data()];
      });
      setRes(memeArr);
    };

    getResults();
  }, []);

  return (
    <>
      <Box textAlign="center" as="kbd">
        <Text fontSize="5xl" fontWeight="extrabold" mt={4}>
          Top Programming Meme
        </Text>
        <Text
          fontSize="md"
          fontWeight="bold"
          color="gray.200"
          noOfLines={2}
          my={6}
        >
          Here are the top 3 memes hackers voted for
        </Text>
        <Center>
          <Flex>
            {res.map(meme => {
              return (
                <Box
                  key={meme.image_url}
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image
                    src={meme.image_url}
                    alt=""
                    htmlHeight={500}
                    htmlWidth={500}
                    objectFit="contet"
                  />
                  <Box mt={10}>
                    Count: {meme.count}
                    <Box as="span" color="gray.600" fontSize="sm"></Box>
                  </Box>
                </Box>
              );
            })}
          </Flex>
        </Center>
      </Box>
      <BackHome />
    </>
  );
}

export default Results;
