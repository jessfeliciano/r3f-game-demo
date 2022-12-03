import React, { useRef } from 'react';
import spriteData from '../spriteData';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import useGameObject from '../@core/useGameObject';
import Sprite, { SpriteRef } from '../@core/Sprite';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Collider from '../@core/Collider';

const ZombiePlantScript = () => {
    const { getComponent } = useGameObject();
    const plantState = useRef(false);

    useGameObjectEvent<InteractionEvent>('interaction', () => {
        plantState.current = !plantState.current;

        if (plantState.current) {
            getComponent<SpriteRef>('Sprite').setState('zombie-plant-2');
        } else {
            getComponent<SpriteRef>('Sprite').setState('zombie-plant-1');
        }

        return waitForMs(400);
    });

    return null;
};

const ZombiePlant = (props: GameObjectProps) => {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider />
            <Interactable />
            <Sprite
                {...spriteData.objects}
                state="zombie-plant-1"
                offset={{ x: 0, y: 0.25 }}
            />
            <ZombiePlantScript />
        </GameObject>
    );
};

export default ZombiePlant;
