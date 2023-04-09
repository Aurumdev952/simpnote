import uFuzzy from '@leeoniya/ufuzzy'
import { useEffect, useState } from 'react';

export function searchFunc(needle, haystack) {
    if (needle == '') {
        return haystack
    }
    let opts = {};
    
    let uf = new uFuzzy(opts);
    
    // pre-filter
    let idxs = uf.filter(haystack, needle);
    
    // sort/rank only when <= 1,000 items
    let infoThresh = 1e3;
    
    if (idxs.length <= infoThresh) {
      let info = uf.info(idxs, haystack, needle);
    
      // order is a double-indirection array (a re-order of the passed-in idxs)
      // this allows corresponding info to be grabbed directly by idx, if needed
      let order = uf.sort(info, haystack, needle);
    
      // render post-filtered & ordered matches
    //   for (let i = 0; i < order.length; i++) {
    //     setres(['none'])
    //   }
      let thisres = order.map((o, i) => {
        return haystack[info.idx[order[i]]]
      })
      return thisres

    }
    else {
      // render pre-filtered but unordered matches
    //   for (let i = 0; i < idxs.length; i++) {
    //     console.log(haystack[idxs[i]]);
    //   }
      let thisres = idxs.map((o, i) => {
        return haystack[idxs[i]]
      })
      return thisres
    }
}
export function search2(needle, haystack, setState) {
    let opts = {};
    
    let uf = new uFuzzy(opts);
    
    // pre-filter
    let idxs = uf.filter(haystack, needle);
    
    // sort/rank only when <= 1,000 items
    let infoThresh = 1e3;
    
    if (idxs.length <= infoThresh) {
      let info = uf.info(idxs, haystack, needle);
    
      // order is a double-indirection array (a re-order of the passed-in idxs)
      // this allows corresponding info to be grabbed directly by idx, if needed
      let order = uf.sort(info, haystack, needle);
    
      // render post-filtered & ordered matches
    //   for (let i = 0; i < order.length; i++) {
    //     setres(['none'])
    //   }
      let thisres = order.map((o, i) => {
        return haystack[info.idx[order[i]]]
      })
      setState(thisres)

    }
    else {
      // render pre-filtered but unordered matches
    //   for (let i = 0; i < idxs.length; i++) {
    //     console.log(haystack[idxs[i]]);
    //   }
      let thisres = idxs.map((o, i) => {
        return haystack[idxs[i]]
      })
      setState(thisres)
    }
}

const Test = () => {
    const [test, setTest] = useState('')
    const [res, setres] = useState([])
    let haystack = [
        'puzzle',
        'Super Awesome Thing (now with stuff!)',
        'FileName.js',
        '/feeding/the/catPic.jpg',
        'car',
        'speed car',
        'test',
        'blabla',
        "The quick brown fox",
        "jumped over the lazy dog",
        "A stitch in time saves nine",
        "An apple a day keeps the doctor away",
        "Barking dogs seldom bite",
        "Beauty is in the eye of the beholder",
        "Early to bed and early to rise",
        "Fools rush in where angels fear to tread",
        "Practice makes perfect",
        "The pen is mightier than the sword"
    ];
   
    useEffect(() => {
        search2(test, haystack, setres)
    }, [test])

    return (<div>
        <input type="text"
        value={test}
        onChange={(e) => {
            setTest(e.target.value)
        }}
        />
        <div>
            <h3>results</h3>
            {res.map((r) => (<p>{r}</p>))}
        </div>
    </div>)
}

export default Test