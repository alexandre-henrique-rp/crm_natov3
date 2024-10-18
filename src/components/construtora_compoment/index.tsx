import { Box, Flex, Text } from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa6";
import { mask } from "remask";
import { PrismaClient } from "@prisma/client";
import BtmExcluirConstrutora from "../botoes/btn_excluir_construtora";
import { BtmCopy } from "../botoes/btn_copy";
import { BtmConstrutoraListUser } from "../botoes/btn_construtora_list_user";
import { ConstrutoraType } from "@/app/(private_route)/construtoras/page";
import { BtnEditarConstrutora } from "../botoes/btn_editar_construtoras";

const prisma = new PrismaClient();

interface TypeConstrutora {
  data: ConstrutoraType[];
}

async function GetCorretorByConstrutora(Id: number) {
  try {
    const reqest = await prisma.nato_user.findMany({
      where: {
        construtora: {
          contains: Id.toString()
        }
      },
      select: {
        id: true,
        nome: true,
        cargo: true,
      }
    })

    return reqest

  } catch (error) {
    console.log(error);
    return null
  }
}

export default function Construtora({ data }: TypeConstrutora) {
  return (
    <>
      <Flex
        w={"100%"}
        mb={8}
        justifyContent="center"
        alignItems="center"
      ></Flex>
      <Flex gap={4} flexWrap={"wrap"}>
        {data.map(async(c: ConstrutoraType) => {
          const corretores = await GetCorretorByConstrutora(c.id);
          return (
            <Box
              key={c.id}
              border="3px solid #E8E8E8"
              borderRadius="8px"
              p={3}
              flexDir="column"
              w={{ base: "100%", md: "30%", lg: "20em" }}
              fontSize={"0.8rem"}
            >
              <Flex w="100%" flexDir={"column"} gap={4}>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    ID:
                  </Text>
                  {c.id}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    Fantasia:
                  </Text>
                  {c.fantasia}
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight="bold" fontSize="sm">
                    Telefone:
                  </Text>
                  {c.tel
                    ? mask(c.tel, ["(99) 9 9999-9999", "(99) 9999-9999"])
                    : ""}
                  <BtmCopy
                    icon={<FaCopy />}
                    aria-label="copy"
                    size={"xs"}
                    bg={"blue.500"}
                    color={"white"}
                    value={c.tel as string}
                    label="Telefone"
                  />
                </Flex>
              </Flex>
              <Flex mt={3} gap={2} w="100%" justifyContent="space-between">
                <BtmConstrutoraListUser data={corretores}/>
                <BtnEditarConstrutora id={c.id} />
                <BtmExcluirConstrutora id={c.id} status={c.status} />
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </>
  );
}