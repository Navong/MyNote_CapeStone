"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: CoverImageProps) => {
  const params = useParams();

  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const coverImage = useCoverImage();

  const onRemove = () => {
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="cover" className="object-cover" />}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            className="text-xs text-muted-foreground"
            onClick={coverImage.onOpen}
            variant="outline"
            size="sm"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Change cover
          </Button>{" "}
          <Button
            className="text-xs text-muted-foreground"
            onClick={onRemove}
            variant="outline"
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;
