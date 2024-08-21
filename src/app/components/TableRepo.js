import request from "@/services/request";
import {
  Table,
  TableContainer,
  Tfoot,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  Select,
  Box,
  Spinner,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function TableUser({ repoSelected, setRepoSelected, onOpen }) {
  let [repos, setRepos] = useState([]);
  let [reposFilter, setReposFilter] = useState([]);
  let [arrLang, setArrLang] = useState([]);
  let [filter, setFilter] = useState({ lang: [] });
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    request
      .get("/repos")
      .then((res) => {
        res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setRepos(res.data);
        let optionsLang = [];
        res.data.forEach((repo) => {
          if (!optionsLang.includes(repo.language)) {
            optionsLang.push(repo.language);
          }
        });
        setArrLang(optionsLang);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleFilterLanguage = ({langValue}) => {
    if(langValue || langValue===null){
      if(filter.lang.includes(langValue)){
        filter.lang.splice(filter.lang.indexOf(langValue), 1);
      }else{
        filter.lang.push(langValue);
      }
      setFilter(filter);
      setReposFilter(
        repos.filter((repo) => {
          return filter.lang.includes(repo.language);
        })
      )
    }
  };

  return (
    <div>
      <div style={{ padding: 20 }}>
        <Stack direction="row">
          {arrLang.map((lang, index) => {
            lang = lang ? lang : null;
            return <Badge
              key={index}
              minW={50}
              textAlign={"center"}
              onClick={() => {
                handleFilterLanguage({langValue:lang});
              }}
              variant={filter.lang.includes(lang) ? 'solid' : 'outline'} colorScheme={filter.lang.includes(lang) ? 'green' : 'gray'}
              cursor={"pointer"}
            >
              {lang}
            </Badge>
          })}
        </Stack>
      </div>
      <hr />
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <Spinner />
        </Box>
      ) : (
        <TableContainer>
          <Table colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Language</Th>
                <Th>Forks count </Th>
              </Tr>
            </Thead>
            <Tbody>
              {(reposFilter.length > 0 ? reposFilter : repos).map(
                (repo, index) => (
                  <Tr
                    key={index}
                    onClick={() => {
                      setRepoSelected(repo);
                      onOpen();
                    }}
                    background={
                      repoSelected?.id === repo.id ? "yellow.200" : ""
                    }
                    cursor={"pointer"}
                  >
                    <Td>{repo.name}</Td>
                    <Td>{repo.description}</Td>
                    <Td>{repo.language}</Td>
                    <Td>{repo.forks_count}</Td>
                  </Tr>
                )
              )}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
