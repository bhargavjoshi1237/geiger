import React from "react";
import { BaseEdge, getStraightPath, useInternalNode } from "@xyflow/react";
import { getNodeIntersection } from "@/lib/wrapers/edge/EdgeArrow";

const CenterEdge = ({ id, source, target, style, markerEnd }) => {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (
    !sourceNode ||
    !sourceNode.measured ||
    !targetNode ||
    !targetNode.measured
  ) {
    return null;
  }

  const { width: wA, height: hA } = sourceNode.measured;
  const { x: xA, y: yA } = sourceNode.internals.positionAbsolute;
  const startX = xA + wA / 2;
  const startY = yA + hA / 2;

  const { x: targetX, y: targetY } = getNodeIntersection(
    sourceNode,
    targetNode,
  );

  const [edgePath] = getStraightPath({
    sourceX: startX,
    sourceY: startY,
    targetX,
    targetY,
  });

  return <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />;
};

export default CenterEdge;
