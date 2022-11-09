import { FC } from "react";

interface WelcomeProps {
  test: string;
}

export const Welcome: FC<WelcomeProps> = ({ test }) => (
  <>
    <div>Welcome</div>
    <div>Next js full stack starter</div>
    <span>{test}</span>
  </>
);
