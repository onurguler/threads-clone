import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { ssgHelper } from "~/server/api/ssgHelper";
import Image from "next/image";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { AiOutlineInstagram } from "react-icons/ai";

const ProfilePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ profile }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-2xl font-medium">{profile.name}</h3>
            <div className="flex items-center gap-1">
              <span className="text-sm">{profile.username}</span>
              <span className="rounded-full bg-zinc-200 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-900">
                threads.net
              </span>
            </div>
          </div>

          <Image
            className="mr-1 h-16 w-16 rounded-full object-cover"
            src={profile.profilePictureUrl}
            width={100}
            height={100}
            alt={profile.name!}
          />
        </div>

        <div className="flex items-center justify-between">
          <button className="font-light text-zinc-400 hover:underline">
            {profile.followersCount} followers
          </button>
          <div className="flex items-center gap-2">
            <button className="rounded-full p-1 text-3xl hover:bg-zinc-900">
              <AiOutlineInstagram />
            </button>
            <button className="rounded-full p-1 text-3xl hover:bg-zinc-900">
              <HiOutlineDotsCircleHorizontal />
            </button>
          </div>
        </div>

        {profile.isPrivate ? (
          <div className="flex h-full flex-1 items-center justify-center">
            <p className="my-32 text-zinc-400">This account is private.</p>
          </div>
        ) : (
          <div className="-mx-6 grid grid-cols-2">
            <button className="w-full border-b border-zinc-900 px-4 py-2 text-sm font-medium dark:border-zinc-50">
              Threads
            </button>
            <button className="w-full border-b px-4 py-2 text-sm font-medium text-zinc-400 dark:border-zinc-600  dark:text-zinc-600">
              Replies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ username: string }>
) => {
  const username = context.params?.username;

  if (!username) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const ssg = await ssgHelper(context);
  const profile = await ssg.users.getPublicProfileDetails.fetch({ username });

  if (!profile) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      trpcState: ssg.dehydrate(),
      profile,
    },
  };
};

export default ProfilePage;
