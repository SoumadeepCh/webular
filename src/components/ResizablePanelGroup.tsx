"use client";

import { PanInfo, motion, useAnimation } from "framer-motion";
import React, { Children, isValidElement, cloneElement } from "react";

interface ResizablePanelGroupProps {
	children: React.ReactNode;
}

export default function ResizablePanelGroup({
	children,
}: ResizablePanelGroupProps) {
	const controls = useAnimation();

	const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
		controls.set({ x: info.offset.x });
	};

	return (
		<div className="flex w-full h-full">
			{Children.map(children, (child, index) => {
				if (isValidElement(child)) {
					const element = child as React.ReactElement;

					return (
						<React.Fragment key={index}>
							
							{index < Children.count(children) - 1 && (
								<motion.div
									drag="x"
									onDrag={handleDrag}
									className="w-2 bg-gray-300 cursor-col-resize"
									animate={controls}
								/>
							)}
						</React.Fragment>
					);
				}
				return null;
			})}
		</div>
	);
}