"use client";

// core
import React from "react";

// components
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { cn } from "@/shared/ui/class-merge";

type MoveFunctionParams = {
  nextIndex: number;
  fromIndex: number;
  originalEvent: React.MouseEvent<HTMLButtonElement>;
};

export type MoveOrderArrowItem = {
  key: string;
  content: React.ReactNode;
  classNames?: {
    content?: string;
  };
};

export type MoveOrderArrowListProps = {
  items?: MoveOrderArrowItem[];
  onChange?: (info: {
    nextIndex: number;
    fromIndex: number;
    originalEvent: React.MouseEvent<HTMLButtonElement>;
  }) => void;
  onRemove?: (info: { index: number; originalEvent: React.MouseEvent<HTMLButtonElement> }) => void;
};

export function MoveOrderArrowList({ items, onChange, onRemove }: MoveOrderArrowListProps) {
  const renderedItems = items ?? [];

  const moveItem = ({ fromIndex, nextIndex, originalEvent }: MoveFunctionParams) => {
    onChange?.({ fromIndex, nextIndex, originalEvent });
  };

  return (
    <div className="flex flex-col gap-2">
      {renderedItems.map((item, index) => (
        <Card key={item.key} className="p-0">
          <CardContent className="flex items-center justify-between gap-2 p-4">
            <div className="flex flex-col gap-1 h-full self-start">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                title="Move Up"
                disabled={index === 0}
                onClick={(event) =>
                  moveItem({ nextIndex: index - 1, fromIndex: index, originalEvent: event })
                }
              >
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                title="Move Down"
                disabled={index === renderedItems.length - 1}
                onClick={(event) =>
                  moveItem({ nextIndex: index + 1, fromIndex: index, originalEvent: event })
                }
              >
                <ArrowDown className="h-3 w-3" />
              </Button>
            </div>
            <div className={cn("flex-1 h-full", item?.classNames?.content)}>{item.content}</div>
            <div className="h-full self-start">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                title="Trash"
                className="text-destructive hover:text-destructive shrink-0"
                onClick={(event) => onRemove?.({ index, originalEvent: event })}
              >
                <Trash2 />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
