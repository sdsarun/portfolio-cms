/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { CSSProperties, forwardRef, KeyboardEvent, useEffect, useRef, useState } from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { Hand, ImageOff, Maximize2, Minus, Plus, RefreshCw, RotateCcw, RotateCw } from "lucide-react";

import { cn } from "@/shared/ui/class-merge";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { Skeleton } from "@/shared/ui/skeleton";

export type ImageProps = NextImageProps & {
  enableViewer?: boolean;
  showLoadingState?: boolean;
  wrapperClassName?: string;
  caption?: string;
};

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    className,
    wrapperClassName,
    enableViewer = true,
    showLoadingState = true,
    caption,
    alt,
    onLoad,
    width,
    height,
    fill,
    style,
    ...imageProps
  },
  ref
) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(!showLoadingState);
  const [hasError, setHasError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<{
    active: boolean;
    isPointerDown: boolean;
    startX: number;
    startY: number;
    panX: number;
    panY: number;
  }>({
    active: false,
    isPointerDown: false,
    startX: 0,
    startY: 0,
    panX: 0,
    panY: 0
  });
  const pinchState = useRef<{
    initialDistance: number | null;
    lastZoom: number;
    startCenter: { x: number; y: number } | null;
    basePan: { x: number; y: number };
    pointers: Map<number, { x: number; y: number }>;
  }>({
    initialDistance: null,
    lastZoom: 1,
    startCenter: null,
    basePan: { x: 0, y: 0 },
    pointers: new Map()
  });
  const DRAG_THRESHOLD = 3; // pixels

  const canPreview = enableViewer && !hasError;
  const hasDimensions = typeof width !== "undefined" && typeof height !== "undefined";
  const resolvedFill = fill ?? !hasDimensions;
  const imageDimensionProps = resolvedFill
    ? { fill: true as const }
    : { width: width ?? 1600, height: height ?? 900 };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!canPreview) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setViewerOpen(true);
    }
  };

  const baseImageClassName = cn(
    "transition-opacity duration-300",
    className,
    showLoadingState && !isLoaded && "opacity-0",
    hasError && "opacity-0"
  );

  const figure = (
    <figure
      className={cn(
        "relative overflow-hidden rounded-md border border-border bg-gradient-to-b from-muted/60 via-muted/30 to-background",
        wrapperClassName
      )}
    >
      <NextImage
        {...imageProps}
        alt={alt}
        ref={ref}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setHasError(true);
          imageProps.onError?.(event);
        }}
        className={baseImageClassName}
        style={style}
        {...imageDimensionProps}
      />

      {showLoadingState && !isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 h-full w-full" />
      )}

      {canPreview && (
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/5" />
      )}

      {canPreview && (
        <div className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Maximize2 className="size-3.5" />
          View
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 text-muted-foreground">
          <ImageOff className="size-6" />
          <span className="text-xs">Image unavailable</span>
        </div>
      )}

      {caption && (
        <figcaption className="border-t border-border/60 bg-background/60 px-3 py-2 text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );

  const viewerImageStyle: CSSProperties = {
    objectFit: "contain",
    ...(style ?? {}),
    width: "100%",
    height: "100%"
  };

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  const adjustZoom = (delta: number) => setZoom((prev) => clamp(prev + delta, 0.5, 8));
  const setZoomAndResetPan = (value: number) => {
    setZoom(clamp(value, 0.5, 8));
    setPan({ x: 0, y: 0 });
  };
  const rotate = (delta: number) => setRotation((prev) => (prev + delta + 360) % 360);
  const resetTransforms = () => {
    setZoom(1);
    setRotation(0);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  };

  useEffect(() => {
    if (viewerOpen) {
      resetTransforms();
    }
  }, [viewerOpen]);

  useEffect(() => {
    if (zoom <= 1 && (pan.x !== 0 || pan.y !== 0)) {
      setPan({ x: 0, y: 0 });
    }
  }, [zoom, pan.x, pan.y]);

  return (
    <>
      <div
        role={canPreview ? "button" : "img"}
        tabIndex={canPreview ? 0 : -1}
        aria-label={canPreview ? `Open image viewer for ${alt ?? "image"}` : alt}
        onClick={() => canPreview && setViewerOpen(true)}
        onKeyDown={handleKeyDown}
        className={cn(
          "group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          canPreview && "cursor-zoom-in"
        )}
      >
        {figure}
      </div>

      {enableViewer && !hasError && (
        <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
          <DialogContent className="fixed left-0 top-0 w-screen h-screen max-w-none max-h-none translate-x-0 translate-y-0 border-0 bg-black text-white shadow-none p-0 gap-0 rounded-none sm:max-w-none">
            <DialogTitle className="sr-only">{alt ?? "Image viewer"}</DialogTitle>
            <div className="group/image-viewer relative h-full w-full overflow-hidden bg-black">
              <div
                className={cn(
                  "relative flex h-full w-full touch-none select-none items-center justify-center transition-transform duration-150 ease-out",
                  zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
                )}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                  transformOrigin: "center center"
                }}
                onPointerDown={(event) => {
                  const target = event.currentTarget;
                  target.setPointerCapture(event.pointerId);
                  event.preventDefault();

                  // Track pointers for pinch gestures.
                  pinchState.current.pointers.set(event.pointerId, {
                    x: event.clientX,
                    y: event.clientY
                  });

                  if (pinchState.current.pointers.size >= 2) {
                    const points = Array.from(pinchState.current.pointers.values());
                    const dx = points[0].x - points[1].x;
                    const dy = points[0].y - points[1].y;
                    pinchState.current.initialDistance = Math.hypot(dx, dy);
                    pinchState.current.startCenter = {
                      x: (points[0].x + points[1].x) / 2,
                      y: (points[0].y + points[1].y) / 2
                    };
                    pinchState.current.basePan = { ...pan };
                    pinchState.current.lastZoom = zoom;
                    return;
                  }

                  setIsDragging(false);
                  dragState.current = {
                    active: false,
                    isPointerDown: true,
                    startX: event.clientX,
                    startY: event.clientY,
                    panX: pan.x,
                    panY: pan.y
                  };
                }}
                onPointerMove={(event) => {
                  let handled = false;
                  // Update pointer for pinch tracking.
                  if (pinchState.current.pointers.has(event.pointerId)) {
                    pinchState.current.pointers.set(event.pointerId, {
                      x: event.clientX,
                      y: event.clientY
                    });
                  }

                  // Handle pinch zoom when two pointers are active.
                  if (
                    pinchState.current.pointers.size >= 2 &&
                    pinchState.current.initialDistance &&
                    pinchState.current.startCenter
                  ) {
                    const points = Array.from(pinchState.current.pointers.values());
                    const dx = points[0].x - points[1].x;
                    const dy = points[0].y - points[1].y;
                    const distance = Math.hypot(dx, dy);
                    const scaleChange = distance / pinchState.current.initialDistance;
                    const nextZoom = clamp(pinchState.current.lastZoom * scaleChange, 0.5, 8);
                    setZoom(nextZoom);
                    pinchState.current.lastZoom = nextZoom;

                    const center = {
                      x: (points[0].x + points[1].x) / 2,
                      y: (points[0].y + points[1].y) / 2
                    };
                    const centerDeltaX = center.x - pinchState.current.startCenter.x;
                    const centerDeltaY = center.y - pinchState.current.startCenter.y;
                    setPan({
                      x: pinchState.current.basePan.x + centerDeltaX,
                      y: pinchState.current.basePan.y + centerDeltaY
                    });
                    handled = true;
                  }

                  if ((zoom <= 1 || !dragState.current.isPointerDown) && !handled) return;
                  if (handled) {
                    event.preventDefault();
                    return;
                  }

                  const deltaX = event.clientX - dragState.current.startX;
                  const deltaY = event.clientY - dragState.current.startY;

                  if (!dragState.current.isPointerDown) return;

                  if (!dragState.current.active) {
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    if (distance < DRAG_THRESHOLD) return;
                    dragState.current.active = true;
                    setIsDragging(true);
                  }

                  setPan({
                    x: dragState.current.panX + deltaX,
                    y: dragState.current.panY + deltaY
                  });
                  event.preventDefault();
                }}
                onPointerUp={(event) => {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                  pinchState.current.pointers.delete(event.pointerId);
                  if (pinchState.current.pointers.size < 2) {
                    pinchState.current.initialDistance = null;
                    pinchState.current.startCenter = null;
                  }

                  dragState.current.active = false;
                  dragState.current.isPointerDown = false;
                  setIsDragging(false);
                }}
                onPointerCancel={(event) => {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                  pinchState.current.pointers.delete(event.pointerId);
                  pinchState.current.initialDistance = null;
                  pinchState.current.startCenter = null;
                  dragState.current.active = false;
                  dragState.current.isPointerDown = false;
                  setIsDragging(false);
                }}
                onDoubleClick={() => {
                  setZoomAndResetPan(1);
                }}
                onWheel={(event) => {
                  event.preventDefault();
                  const delta = event.deltaY > 0 ? -0.25 : 0.25;
                  adjustZoom(delta);
                }}
              >
                <NextImage
                  {...imageProps}
                  alt={alt}
                  sizes={imageProps.sizes ?? "100vw"}
                  className={cn("object-contain", className)}
                  style={viewerImageStyle}
                  {...imageDimensionProps}
                />
              </div>
              <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md opacity-0 transition-opacity duration-150 group-hover/image-viewer:pointer-events-auto group-hover/image-viewer:opacity-100">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 transition hover:bg-white/20"
                  onClick={() => adjustZoom(0.25)}
                  aria-label="Zoom in"
                >
                  <Plus className="size-3.5" />
                  Zoom
                </button>
                <button
                  type="button"
                  className="rounded-full bg-white/10 p-1 transition hover:bg-white/20"
                  onClick={() => adjustZoom(-0.25)}
                  aria-label="Zoom out"
                  disabled={zoom <= 0.5}
                >
                  <Minus className="size-3.5" />
                </button>
                <button
                  type="button"
                  className="rounded-full bg-white/10 p-1 transition hover:bg-white/20"
                  onClick={() => rotate(-90)}
                  aria-label="Rotate left"
                >
                  <RotateCcw className="size-3.5" />
                </button>
                <button
                  type="button"
                  className="rounded-full bg-white/10 p-1 transition hover:bg-white/20"
                  onClick={() => rotate(90)}
                  aria-label="Rotate right"
                >
                  <RotateCw className="size-3.5" />
                </button>
                <button
                  type="button"
                  className="rounded-full bg-white/10 p-1 transition hover:bg-white/20"
                  onClick={resetTransforms}
                  aria-label="Reset view"
                >
                  <RefreshCw className="size-3.5" />
                </button>
                <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[11px]">
                  <Hand className="size-3.5" />
                  <span>Drag to pan</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
});

Image.displayName = "Image";

export { Image };
