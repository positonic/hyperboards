import { useRef, useState } from "react";
import { useSize } from "@chakra-ui/react-use-size";
import {
  registryContentItemToHyperboardEntry,
  useRegistryContents,
} from "@/hooks/registry";
import { Flex } from "@chakra-ui/react";
import { Hyperboard } from "@/components/hyperboard";
import * as React from "react";

export const FtcBoard = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useSize(containerRef);

  const [displayBoards, setDisplayBoards] = useState<
    "sponsors" | "speakers" | "all"
  >("all");

  const { data } = useRegistryContents("c471dae2-c933-432c-abcc-84a57d809d44");

  const sponsors = Object.values(data || {}).filter(
    (x) => x.displayData.type === "person" || x.displayData.type === "company",
  );
  const speakers = Object.values(data || {}).filter(
    (x) => x.displayData.type === "speaker",
  );

  const height = ((dimensions?.width || 1) / 16) * 9;

  return (
    <Flex width={"100%"} ref={containerRef}>
      {(displayBoards === "sponsors" || displayBoards === "all") && (
        <Flex flexGrow={1}>
          <Hyperboard
            onClickLabel={() =>
              setDisplayBoards((val) => (val === "all" ? "sponsors" : "all"))
            }
            label="Sponsors"
            height={height}
            data={sponsors.map((x) => registryContentItemToHyperboardEntry(x))}
          />
        </Flex>
      )}
      {(displayBoards === "speakers" || displayBoards === "all") && (
        <Flex flexGrow={1}>
          <Hyperboard
            onClickLabel={() =>
              setDisplayBoards((val) => (val === "all" ? "speakers" : "all"))
            }
            label="Speakers"
            height={height}
            data={speakers.map((x) => registryContentItemToHyperboardEntry(x))}
          />
        </Flex>
      )}
    </Flex>
  );
};