import React from 'react';
import { SiHtml5, SiCss3, SiJavascript, SiNodedotjs, SiPython, SiMongodb, SiTypescript } from 'react-icons/si';

interface SkillIconProps {
  iconKey: string;
  size?: number;
}

export function SkillIcon({ iconKey, size = 24 }: SkillIconProps) {
  switch (iconKey) {
    case 'html':
      return <SiHtml5 size={size} />;
    case 'css':
      return <SiCss3 size={size} />;
    case 'javascript':
      return <SiJavascript size={size} />;
    case 'nodejs':
      return <SiNodedotjs size={size} />;
    case 'python':
      return <SiPython size={size} />;
    case 'mongodb':
      return <SiMongodb size={size} />;
    case 'typescript':
      return <SiTypescript size={size} />;
    default:
      return null;
  }
}