import { requireAuth } from "~/utils/requireAuth";

export const getServerSideProps = requireAuth(async (_) => {
  return { props: {} };
});

export default function Home() {
  return <h1>Hello World!</h1>;
}
