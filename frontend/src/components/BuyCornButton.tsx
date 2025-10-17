"use client";

import { useMutation } from "@tanstack/react-query";
import { buyCorn } from "@/api/corn";

export function BuyCornButton() {
  const mutation = useMutation({
    mutationFn: buyCorn,
  });

  return (
    <div className='space-y-4'>
      <button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        className='
        bg-yellow-600 hover:bg-yellow-500
        text-white font-bold
        py-3 px-6
        rounded-lg
        transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
      '
      >
        {mutation.isPending ? "Loading" : "Buy Corn"}
      </button>

      {mutation.isSuccess && (
        <p className='text-green-600 font-bold'>{mutation.data.message}</p>
      )}

      {mutation.isError && (
        <p className='text-red-600 font-bold'>{mutation.error.message}</p>
      )}
    </div>
  );
}
