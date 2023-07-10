import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { TbSend } from "react-icons/tb";
import { api } from "~/utils/api";
import { NewThread, newThreadSchema } from "~/utils/validations/threads";

const MAX_LENGTH = 280;

function updateTextAreaSize(textarea: HTMLTextAreaElement | null) {
  if (textarea === null) return;
  textarea.style.height = "0";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

export function NewThreadForm() {
  const session = useSession();
  const { mutateAsync } = api.threads.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
  } = useForm<NewThread>({
    resolver: zodResolver(newThreadSchema),
  });

  const { ref, ...textAreaRegister } = register("bodyText");

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textAreaRefCallback = useCallback(
    (textArea: HTMLTextAreaElement | null) => {
      updateTextAreaSize(textArea);
      textAreaRef.current = textArea;
    },
    []
  );

  const bodyTextWatch = watch("bodyText");

  useEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [bodyTextWatch]);

  if (session.status !== "authenticated") {
    return null;
  }

  const onSubmit = async (data: NewThread) => {
    const result = await mutateAsync(data);
    if (result.status === 201) {
      console.log("thread created");
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-end gap-2"
    >
      <div className="flex w-full flex-col gap-2">
        <textarea
          ref={(e) => {
            ref(e);
            textAreaRefCallback(e);
          }}
          className="w-full resize-none overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800 px-4 py-2 outline-none placeholder:text-lg"
          placeholder="Start a new thread..."
          maxLength={MAX_LENGTH}
          style={{ minHeight: "6rem" }}
          {...textAreaRegister}
        ></textarea>
        {errors?.bodyText && (
          <span className="text-xs text-red-500">
            {errors.bodyText.message}
          </span>
        )}
      </div>
      <div className="flex w-full items-start justify-between">
        <p
          className={`text-xs ${
            getValues("bodyText")?.length < MAX_LENGTH
              ? "text-zinc-600"
              : "text-red-500"
          }`}
        >
          {getValues("bodyText")?.length || 0}/{MAX_LENGTH}
        </p>
        <button className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 font-medium text-zinc-50 hover:bg-blue-700">
          <TbSend />
          Share
        </button>
      </div>
    </form>
  );
}
