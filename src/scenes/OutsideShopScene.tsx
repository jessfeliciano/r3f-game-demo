import React, { Fragment } from 'react';
import Plant from '../entities/Plant';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import spriteData from '../spriteData';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Player from '../entities/Player';

const mapData = mapDataString(`
R R S R R R G G G G T
G G P G G G G G G G T
G G P G F F F G G G T
G G P F T T T F P P P
G G P F T T T F P G T
G G P F T P T F P G T
P P P P P P P P P G T
G G G G G G G G G G T
# # # # # # # # # # T
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
        case 'P':
            return floor;
        case 'G':
            return floor;
        case 'F':
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
                    <Sprite {...spriteData.objects} state="wall" />
                </GameObject>
            );
        case 'S':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall" />
                </GameObject>
            );
        case 'T':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall" />
                </GameObject>
            );
        default:
            return null;
    }
};

const OutsideShopScene = () => {
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={5} y={3}>
                <Collider />
                <Interactable />
                <ScenePortal name="start" enterDirection={[1, 0]} target="inside/exit" />
            </GameObject>
            <Player x={5} y={1} />
        </>
    );
};

export default OutsideShopScene;
