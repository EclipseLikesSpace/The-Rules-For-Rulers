// EVEN more github copilot shenanigans!!
// Language: typescript
// Path: src\main.ts

type KeyType = {
    /**
     * Name of the key (this will be for cosmetic purposes only, not the actual rank)
     */
    name: String
    /**
     * Loyalty of the key, this will be used to check if the key will betray or not
     */
    loyalty: number
    /**
     * The rank of this key
     */
    rank: number
};

class Key {
    keyType: KeyType

    constructor(keyType: KeyType) {
        this.keyType = keyType
    }
}