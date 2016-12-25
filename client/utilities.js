/**
 * Created by jj on 10/12/16.
 */

import React from 'react';

// if error, use Bert to show error bar
// if success, either run the "success" function (if function) or show it as a message (if string)
exports.callBackBert = function(success){
    return (error, data) =>
    {
        if (error)
        {
            Bert.alert( error.reason, 'danger' );
            console.log(error);
        }
        else
        {
            if (typeof(success)=="function") success(data);
            else if (typeof(success)=="string") Bert.alert( success, 'success' );
            else if (success) console.log("Dunno what to do with input type", typeof(success));
        }
    };
};

// baseName: refs are "baseName-value" (e.g. dressyRadio-average); also used as the group name of radio buttons
// inline: stacked radio buttons by default, inline if inline=true
exports.render_radio_buttons = function(onClickCallBack, baseName, values, checkedValue, inline)
{
    // TODO: this is silly I know. I just dunno how to define only parts of the default parameters
    if (typeof checkedValue == 'undefined') checkedValue = null;
    if (typeof inline == 'undefined') inline = false;

    if (inline) {
        return values.map(v =>
            <label className="form-check-inline" key={v}>
                <input ref={`$baseName-$v`}
                       name={baseName}
                       value={v}
                       className="form-check-input" type="radio"
                       checked={checkedValue == v}
                       onChange={onClickCallBack}
                /> {v}
            </label>
        )
    }
    else {
        return values.map(v =>
            <div className="form-check" key={v}>
                <label className="form-check-label">
                    <input ref={`$baseName-$v`}
                           name={baseName}
                           value={v}
                           className="form-check-input" type="radio"
                           checked={checkedValue == v}
                           onChange={onClickCallBack}
                    /> {v}
                </label>
            </div>
        )
    }
};

exports.capitalize_text = function(text)
{
    return text.toLowerCase().split(' ').map(token => token.charAt(0).toUpperCase() + token.substr(1)).join(' ');
};

exports.groupDictionaryByKey = function(arr, groupbyField)
{
    return arr.reduce(
        (res, item) => {
            ( res[item[groupbyField]] = res[item[groupbyField]] || [] ).push(item);
            return res;
        }, {}
    );
};

// sort by type, modified, filepath.
exports.garmentComparer = function(garment1, garment2)
{
    // sort by decreasing type
    if (garment1.type > garment2.type) return -1;
    if (garment1.type < garment2.type) return 1;

    // same type. decreasing modified date.
    const d1 = new Date(garment1['lastModified']);
    const d2 = new Date(garment2['lastModified']);
    if (d1 > d2) return -1;
    if (d1 < d2) return 1;

    // same type & lastModifed. increasing filepath.
    if (garment1.filepath > garment2.filepath) return 1;
    if (garment1.filepath < garment2.filepath) return -1;

    return 0;
};