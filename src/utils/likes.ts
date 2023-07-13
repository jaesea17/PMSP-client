import axios from "axios";

export function addLikes(obj: Record<string, any>, data: Record<string, any>) {
    let price = data.price, observationId = data.observationId;
    const storedID = localStorage.getItem(`obvID_${observationId}`);
    if (storedID === observationId) return;
    obj.likes += 1;
    let likes = obj.likes;
    axios.patch(data.url, { likes, price })
        .then((result) => {
            if (result.status !== 200) return;
            data.setLikes(obj.likes);
            console.log('likes updated successfully', result);
            localStorage.setItem(`obvID_${observationId}`, observationId);

        }).catch((err) => {
            console.log('err:', err)
        })
}
