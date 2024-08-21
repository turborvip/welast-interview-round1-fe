"use client";
import DefaultHeader from "./components/DefaultHeader";
import DefaultFooter from "./components/DefaultFooter";
import { Button, Container, Flex, useDisclosure } from "@chakra-ui/react";
import TableRepo from "./components/TableRepo";
import RepoDetail from "./components/RepoDetail";
import { useState } from "react";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [repoSelected, setRepoSelected] = useState(null)

  return (
    <>
      <DefaultHeader />
      <main style={{ minHeight: 500, marginTop: 100 }}>
        <Container maxW="1200px">
          <Flex justifyContent={"flex-end"} gap={4} paddingBottom={4}>
          </Flex>
          <hr />
          <TableRepo repoSelected={repoSelected} setRepoSelected={setRepoSelected} onOpen={onOpen}/>
        </Container>
        <RepoDetail isOpen={isOpen} onClose={onClose} repoSelected={repoSelected}/>
      </main>
      <DefaultFooter />
    </>
  );
}
