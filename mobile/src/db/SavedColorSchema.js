
const SavedColorSchema = {
    name: 'SavedColor',
    primaryKey: 'hexColor', // only doing this since the ids of the fetchedColors and userColors backend on the Airtable backend aren't the same for a given color
    properties: {
      id:  'string',
      hexColor: 'string'
    }
};

export default SavedColorSchema;