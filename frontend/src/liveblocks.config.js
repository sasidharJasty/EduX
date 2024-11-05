import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';

const client = createClient({
    publicApiKey: "pk_prod_QQMg1BsV7YcPtxgQWM87_fFUoppbuomjHTORM582KyS7q22j1c3EBxZjb8bFFKko",
})

export const { RoomProvider, useMap } = createRoomContext(client)