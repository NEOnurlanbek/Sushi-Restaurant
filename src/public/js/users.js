
console.log("Users frontend javascript file");

$(function () {
    $(".member-status").on("change", function(e) {
        const id = e.target.id;


        const memberStatus = $(`#${id}.member-status`).val();
        console.log("memberStatus",memberStatus);

        axios.post("/admin/user/edit", {
            _id: id,
            memberStatus: memberStatus,
        }).then((response) => {
            console.log("response", response);
            const result = response.data;
            console.log("result", result);

            if(result.data) {
            $(".member-status").blur();
            } else  alert("USER UPDATE FAILED!");
        }).catch((err) => {
            console.log(err);
            alert("USER UPDATE FAILED!");
        });
    });
});