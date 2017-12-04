
<template>
    <div>
        <div class="form-group">
            <router-link :to="{name: 'createPerson'}" class="btn btn-success">Create new person</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">Companies list</div>
            <div class="panel-body">
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th width="100">&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="person, index in people">
                        <td>{{ person.name }}</td>
                        <td>{{ person.email }}</td>
                        <td>
                            <router-link :to="{name: 'editPerson', params: {id: person.id}}" class="btn btn-xs btn-default">
                                Edit
                            </router-link>
                            <a href="#"
                               class="btn btn-xs btn-danger"
                               v-on:click="deleteEntry(person.id, index)">
                                Delete
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                people: []
            }
        },
        mounted() {
            let app = this;
            axios.get('/api/v1/people')
                .then(function (resp) {
                    app.people = resp.data.data
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not load people");
                });
        },
        methods: {
            deleteEntry(id, index) {
                if (confirm("Do you really want to delete it?")) {
                    var app = this;
                    axios.delete('/api/v1/people/' + id)
                        .then(function (resp) {
                            app.people.splice(index, 1);
                        })
                        .catch(function (resp) {
                            alert("Could not delete person");
                        });
                }
            }
        }
    }
</script>
