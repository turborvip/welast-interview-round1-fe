import request from "@/services/request";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function UserDetail({ isOpen, onClose, repoSelected }) {
  const [commit, setCommit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (repoSelected) {
      setIsLoading(true);
      request
        .get(repoSelected?.commits_url.replace("{/sha}", ""))
        .then((res) => {
          setCommit(res.data[0]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [repoSelected]);
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>The most recent commit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <div>Recent commit date: {commit?.commit.author?.date}</div>
                <div>Author: {commit?.commit?.author?.name}</div>
                <div>Message: {commit?.commit?.message}</div>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
