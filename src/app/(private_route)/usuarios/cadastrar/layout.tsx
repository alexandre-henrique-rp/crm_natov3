import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CADASTRO DE USUÁRIO",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
