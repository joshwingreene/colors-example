import { ImmutableRealm } from './helper';

// CREATE

export const persistUserColors = ImmutableRealm(( { colorList }, realm) => { // TODO (for Korey): Look into building a more efficient solution
    // only persist colors that haven't already been saved
    let currentlySavedColors = realm.objects('SavedColor');

    let hexColorsOfSavedColors = [];

    for (let color of currentlySavedColors) {
        hexColorsOfSavedColors.push(color.hexColor);
    }

    console.log('Saved Color hexColors: ', hexColorsOfSavedColors);

    for (let i = 0; i < colorList.length; i++) {
        if (hexColorsOfSavedColors.includes(colorList[i].hexColor) === false) {
            //console.log('color not found');
            realm.write(() => {
                realm.create('SavedColor', { id: colorList[i].id, hexColor: colorList[i].hexColor });
            });
        }
    }
})

export const persistUserColor = ImmutableRealm(( { id, hexColor }, realm) => {
    realm.write(() => {
        realm.create('SavedColor', { id, hexColor });
    })
})

// DELETE

export const deleteUserColors = ImmutableRealm(( {}, realm) => {
    let currentlySavedColors = realm.objects('SavedColor');

    realm.write(() => {
        realm.delete(currentlySavedColors);
    });
})

export const dbDeleteUserColor = ImmutableRealm(( { hexColor }, realm) => {
    let colorToDelete = realm.objects('SavedColor').filtered(`hexColor = $0`, hexColor);
    console.log('dbDeleteUserColor - colorToDelete -', colorToDelete);
    realm.write(() => {
        realm.delete(colorToDelete);
    });
})

// GET

export const getUserColor = ImmutableRealm(( { hexColor }, realm) => {
    console.log('save - getUserColor - hexColor -', hexColor);
    let item = realm.objects('SavedColor').filtered(`hexColor = $0`, hexColor);
    //console.log('item length', item.length);
    console.log('item:', item[0]);
    return item[0];
})

/*
export const getAllUserColors = ImmutableRealm(( {}, realm) => {
    let colors = realm.objects('SavedColor');
    return colors;
})
*/

export const getNumOfUserColors = ImmutableRealm(( {}, realm) => {
    let colors = realm.objects('SavedColor');
    return colors.length;
})

export const getUserColors = ImmutableRealm(( { page, numOfResults }, realm) => { // I'm guessing page will be used to determine where to start the slice for additional pages (also will need to update numOfResults) 
    let colors = realm.objects('SavedColor');
    console.log('getUserColors - length -', colors.length);
    if (colors.length == 0) {
        return [];
    } else if (colors.length < numOfResults) {
        return colors;
    } else {
        colors = colors.slice(0, numOfResults); // for pages after 1, determine the begin and end based on the numOfResults
        return colors;
    }
})
