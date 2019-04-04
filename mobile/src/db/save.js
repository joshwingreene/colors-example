import { ImmutableRealm } from './helper';

export const persistUserColors = ImmutableRealm(( { colorList }, realm) => { // TODO (for Korey): Look into building a more efficient solution
    // only persist colors that haven't already been saved
    let currentlySavedColors = realm.objects('SavedColor');

    let idsOfSavedColors = [];

    for (let color of currentlySavedColors) {
        idsOfSavedColors.push(color.id);
    }

    //console.log('Saved Color Ids: ', idsOfSavedColors);

    for (let i = 0; i < colorList.length; i++) {
        if (idsOfSavedColors.includes(colorList[i].id) === false) {
            //console.log('color not found');
            realm.write(() => {
                realm.create('SavedColor', { id: colorList[i].id, hexColor: colorList[i].hexColor });
            });
        }
    }
})

export const deleteUserColors = ImmutableRealm(( {}, realm) => {
    let currentlySavedColors = realm.objects('SavedColor');

    realm.write(() => {
        realm.delete(currentlySavedColors);
    })
})
