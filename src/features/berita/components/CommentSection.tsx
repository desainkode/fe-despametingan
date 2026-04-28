"use client";

import React, { useState } from "react";
import { MessageSquare, Send, User } from "lucide-react";
import { Comment } from "../types";

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Warga Desa",
      content: "Terima kasih atas informasinya, sangat bermanfaat. Semoga pembangunan jalan segera merata ke seluruh dusun.",
      createdAt: "2 jam yang lalu",
    },
    {
      id: "2",
      author: "Pak RT 04",
      content: "Alhamdulillah, jalan di wilayah kami sekarang sudah jauh lebih baik. Sangat membantu mobilitas warga saat musim hujan.",
      createdAt: "5 jam yang lalu",
    }
  ]);

  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Anda (Anonim)",
      content: newComment,
      createdAt: "Baru saja",
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <section className="mt-16 border-t border-[#0B281F]/5 pt-16">
      <div className="flex items-center gap-3 mb-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B281F]/5 text-[#0B281F]">
          <MessageSquare size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#0B281F]">Komentar Warga</h3>
          <p className="text-[14px] text-[#0B281F]/50">{comments.length} diskusi aktif</p>
        </div>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-[#0B281F]/10 bg-white p-2 shadow-sm focus-within:border-[#009966]/30 focus-within:ring-4 focus-within:ring-[#009966]/5">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tulis pendapat atau pertanyaan Anda..."
            className="w-full min-h-[120px] resize-none border-none bg-transparent p-4 text-[15px] outline-none placeholder:text-[#0B281F]/30"
          />
          <div className="flex items-center justify-between border-t border-[#0B281F]/5 p-3">
            <div className="flex items-center gap-2 px-3 text-[12px] text-[#0B281F]/40">
              <User size={14} />
              Berkomentar sebagai tamu
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-2xl bg-[#0B281F] px-6 py-3 text-[14px] font-bold text-white transition-all hover:bg-[#009966] hover:shadow-lg active:scale-95"
            >
              Kirim Komentar <Send size={16} />
            </button>
          </div>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 sm:gap-6">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-[#0B281F]/10 bg-[#F6F8F7] p-2">
              <User className="h-full w-full text-[#0B281F]/20" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                <p className="text-[15px] font-bold text-[#0B281F]">{comment.author}</p>
                <p className="text-[12px] text-[#0B281F]/40">{comment.createdAt}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-[#0B281F]/70">
                {comment.content}
              </p>
              <div className="mt-4 flex items-center gap-4">
                <button className="text-[12px] font-bold text-[#009966] hover:underline">Balas</button>
                <button className="text-[12px] font-bold text-[#0B281F]/40 hover:text-red-500">Sukai</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
