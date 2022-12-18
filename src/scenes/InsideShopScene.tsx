import React, { Fragment } from 'react';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import spriteData from '../spriteData';
import GameObject from '../@core/GameObject';
import Collider from '../@core/Collider';
import Sprite from '../@core/Sprite';
import Plant from '../entities/Plant';
import Workstation from '../entities/Workstation';
import PizzaPickup from '../entities/PizzaPickup';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Player from '../entities/Player';

const mapData = mapDataString(`
# # T # # # # # T # #
# . . . . . . . . . #
# . s . h . o . . . #
# . S . H . O . . . #
# D D D D D D D D D #
# . . . . . . . . . #
# . . . . . R . . . #
# . . . . . . . . . #
# # # # # . # # # # #
`);

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.objects} state="floor" />
        </GameObject>
    );

    switch (type) {
        case '#':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall" />
                </GameObject>
            );
        case '.':
            return floor;
        case 'T':
            return (
                <Fragment key={key}>
                    {floor}
                    <Plant {...position} />
                </Fragment>
            );
        case 'R':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="workstation-1" />
                </GameObject>
            );
        case 'D':
            return (
                <Fragment key={key}>
                    {floor}
                    <Plant {...position} />
                </Fragment>
            );
        case 'S':
            return (
                <Fragment key={key}>
                    {floor}
                    <Workstation {...position} />
                </Fragment>
            );
        case 'H':
            return (
                <Fragment key={key}>
                    {floor}
                    <Workstation {...position} />
                </Fragment>
            );
        case 'O':
            return (
                <Fragment key={key}>
                    {floor}
                    <Workstation {...position} />
                </Fragment>
            );
        case 'h':
            return (
                <Fragment key={key}>
                    {floor}
                    <PizzaPickup {...position} />
                </Fragment>
            );
        case 'o':
            return (
                <Fragment key={key}>
                    {floor}
                    <PizzaPickup {...position} />
                </Fragment>
            );
        case 's':
            return (
                <Fragment key={key}>
                    {floor}
                    <PizzaPickup {...position} />
                </Fragment>
            );
        case 'B':
            return (
                <Fragment key={key}>
                    {floor}
                    <PizzaPickup {...position} />
                </Fragment>
            );
        default:
            return null;
    }
};

const InsideShopScene = () => {
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={5} y={0}>
                <Collider />
                <Interactable />
                <ScenePortal name="exit" enterDirection={[-1, 0]} target="outside" />
            </GameObject>
            <Player x={5} y={1} />
        </>
    );
};

export default InsideShopScene;
