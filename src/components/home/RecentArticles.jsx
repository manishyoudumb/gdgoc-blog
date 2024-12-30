import { useState, useEffect } from "react";
import {
  Box,
  Text,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Input, InputGroup } from "@chakra-ui/input";
import LoadingSmall from "../layout/LoadingSmall";
import { Divider } from "@chakra-ui/layout";
import { useFirebase } from "../../contexts/FirebaseContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Nav from "../layout/Nav";

function SuggestedArticles() {
  const { currentUser } = useAuth();
  const { getAllPublicArticles } = useFirebase();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getAllPublicArticles();
        setArticles(data.docs.map((el) => el.data()));
        const filteredArticles = data.docs
          .filter(e => e.data().authorID !== currentUser.uid)
          .map(e => e.data());
        setFilteredArticles(filteredArticles);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toString();
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const filteredResults = articles.filter((article) => {
      return article.content.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    setFilteredArticles(filteredResults);
  };

  return (
    <Box
    display="flex"
    flexDirection="column"
    justifyContent='center'
    alignItems="center"
    mx={["4", "8", "12", "16"]}
    maxW="100%"
    m="auto"
  >
    <Nav />
    <Text fontSize={["xl", "2xl", "2xl"]} fontWeight="bold" mb={4}>
      Recently Posted Articles
    </Text>

    <Box my={[2, 5, 10]} width={["100%", "80%", "80%", "50%"]}>
      <InputGroup
        padding={[4, 6, 8]}
        borderRadius="md"
        w={["100%", "100%", "100%", "100%"]}
        borderWidth="1px"
        borderColor="gray.300"
        bg="white"
        _hover={{ borderColor: "gray.400" }}
        _focus={{ borderColor: "blue.400" }}
        width="full"
      >
        <Input
          type="text"
          placeholder="Search for articles"
          height={["56px", "64px", "72px"]}
          width="full"
          borderRadius="md"
          fontSize={["lg", "xl", "2xl"]}
          onChange={(e) => handleSearch(e)}
        />
      </InputGroup>
    </Box>

    {loading ? (
      <LoadingSmall />
    ) : (
      <Box
        display="flex"
        flexDirection="column"
        mt="8"
        gap={[4, 6]}
        px={[2, 4]}
        width={["90%", "80%", "70%", "60%"]}
      >
        {filteredArticles.length === 0 ? (
          <Text fontSize="lg" textAlign="center">
            No articles found
          </Text>
        ) : null}
        {filteredArticles.map((el) => (
          <Box
            key={el.articleID}
            as={Link}
            to={`/article/${el.articleID}`}
            display="flex"
            flexDirection="column"
            p={[4, 6]}
            borderWidth="1px"
            borderRadius="md"
            shadow="sm"
            transition="all 0.2s"
            _hover={{ shadow: "lg", bg: "gray.50" }}
          >
            <Text fontSize={["sm", "md"]} color="blue.500">
              {el.authorUsername}
            </Text>
            <Text fontSize={["sm", "md"]} color="gray.500">
              {getDate(el.when).slice(4, 21)}
            </Text>
            <Text fontSize={["lg", "xl", "2xl"]} fontWeight="semibold">
              {el.content.title}
            </Text>
            <Text fontSize={["sm", "md", "lg"]} color="gray.600" mt={1}>
              {el.content.subtitle}
            </Text>
            <Box mt={4} display="flex" flexWrap="wrap" alignItems="center" gap={4}>
              <Box display="flex" alignItems="center">
                <Text
                  fontSize={["sm", "md"]}
                  color="yellow.500"
                  fontWeight="bold"
                  mr={1}
                >
                  {el.stars}
                </Text>
                <StarIcon color="yellow.500" />
              </Box>
            </Box>
            <Divider my={4} />
          </Box>
        ))}
      </Box>
    )}
  </Box>
  );
}

export default SuggestedArticles;
