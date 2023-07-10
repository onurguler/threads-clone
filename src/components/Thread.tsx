import Image from "next/image";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { BsThreeDots, BsChat } from "react-icons/bs";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { TbSend } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { api } from "~/utils/api";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

type IThread = {
  author: {
    avatar: string;
    name: string | null;
    username: string | null;
  };
  id: string;
  createdAt: Date;
  bodyText: string;
};

type ThreadProps = {
  data: IThread;
};

export function Thread({ data }: ThreadProps) {
  const likeMutation = api.threads.like.useMutation();

  const onClickLike = async () => {
    await likeMutation.mutateAsync({ threadId: data.id });
  };

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <div className="flex flex-shrink-0 flex-col">
          <Image
            className="relative h-10 w-10 rounded-full object-cover"
            src={data.author.avatar}
            width={40}
            height={40}
            alt={data.author.name!}
          />
        </div>
        <div className="flex flex-grow flex-col gap-2">
          <div className="flex w-full justify-between">
            <span className="text-sm font-semibold">
              {data.author.username}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600">
                {timeAgo.format(data.createdAt, "mini")}
              </span>
              <button className="rounded-full p-2 hover:bg-zinc-800">
                <BsThreeDots />
              </button>
            </div>
          </div>
          <p className="-mt-2 font-light">{data.bodyText}</p>
          <div className="flex items-center gap-2 text-xl">
            <button
              onClick={onClickLike}
              className="rounded-full p-1 hover:bg-zinc-800"
            >
              <AiOutlineHeart />
            </button>
            <button className="rounded-full p-1 hover:bg-zinc-800">
              <BsChat />
            </button>
            <button className="rounded-full p-1 hover:bg-zinc-800">
              <RiArrowLeftRightLine />
            </button>
            <button className="rounded-full p-1 hover:bg-zinc-800">
              <TbSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
