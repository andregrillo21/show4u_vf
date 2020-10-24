import React, {useState, useEffect} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Platform } from 'react-native';

const Search = (props) => {
    const [focused, setFocused] = useState(false)
    const { onLocationSelected } = props

    useEffect(() => {
        console.log(focused)
    }, [])

    return <GooglePlacesAutocomplete 
        placeholder="Pesquise o local."
        placeholderTextColor="#333"
        onPress={onLocationSelected}
        query={{
            key: 'AIzaSyCzOi0pUXXr4tGbKVH4vuF_qZqNweNWaHQ',
            language: 'pt'
        }}
        textInputProps={{
            autoCapitalize: "none",
            autoCorrect: false,
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false)
        }}
        listViewDisplayed={focused}
        fetchDetails
        enablePoweredByContainer={false}
        styles={{
            container: {
                position: 'absolute',
                top: Platform.select({ios: 60, android: 20}),
                width: "100%",
                // marginBottom:100
            },
            textInputContainer: {
                flex: 1,
                backgroundColor: 'transparent',
                height: 54,
                marginHorizontal: 20,
                borderTopWidth: 0,
                borderBottomWidth: 0
            },
            textInput: {
                flex:1,
                height: 54,
                paddingLeft: 5,
                paddingRight: 5,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
            },
            listView: {
                backgroundColor: '#ffffff',
                marginHorizontal: 20,
                elevation: 100,
                marginTop: 5
            },
            description: {
                fontSize: 16
            },
            row: {
                padding: 20,
                height: 58
            }
        }}
    />;
}

export default Search;