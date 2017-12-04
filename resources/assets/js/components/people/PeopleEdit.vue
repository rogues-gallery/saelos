<template>
    <div>
        <div class="form-group">
            <router-link to="/" class="btn btn-default">Back</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">Create new person</div>
            <div class="panel-body">
                <form v-on:submit="saveForm()">
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Person name</label>
                            <input type="text" v-model="person.name" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Person email</label>
                            <input type="text" v-model="person.email" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <button class="btn btn-success">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            let app = this;
            let id = app.$route.params.id;
            app.personId = id;
            axios.get('/api/v1/people/' + id)
                .then(function (resp) {
                    app.person = resp.data;
                })
                .catch(function () {
                    alert("Could not load your peron")
                });
        },
        data: function () {
            return {
                personId: null,
                person: {
                    name: '',
                    email: '',
                }
            }
        },
        methods: {
            saveForm() {
                event.preventDefault();
                let app = this;
                let newPerson = app.person;
                axios.patch('/api/v1/people' + app.personId, newPerson)
                    .then(function (resp) {
                        app.$router.replace('/');
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not edit your person");
                    });
            }
        }
    }
</script>
