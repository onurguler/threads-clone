import { NewThreadForm } from "~/components/NewThreadForm";
import { requireAuth } from "~/utils/requireAuth";

export const getServerSideProps = requireAuth(async (_) => {
  return { props: {} };
});

export default function Home() {
  return <NewThreadForm />;
}
