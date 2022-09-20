import { Meta } from "@storybook/react";
import GameItem, { GameIntemProps } from "../../../../../../components/molecules/GameItem";

export default {
    title: 'Components/Molecules/GameItem',
    component: GameItem,
} as Meta;

const Template = (args: GameIntemProps) => <GameItem {...args}/>;

export const Default = Template.bind({});
Default.args = {
    title: 'Super Mechs',
    category: 'Mobile',
}