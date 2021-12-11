import { intArg, list, makeSchema, mutationType, nonNull, objectType, queryType, stringArg } from "nexus"
import { User, Post } from 'nexus-prisma'
import path from "path"
import { iContext } from "./Context"

export const MySchema = makeSchema({
    types: [
        objectType(
            {
                name: User.$name,
                definition(t) {
                    t.field(User.id)
                    t.field(User.name)
                    t.field(User.posts)
                }
            }
        ),
        objectType(
            {
                name: Post.$name,
                definition(t) {
                    t.field(Post.id)
                    t.field(Post.title)
                    t.field(Post.desc)
                }
            }
        ),
        queryType(
            {
                definition(t) {
                    t.field('me', {
                        type: "String",
                        resolve(t) {
                            return 'milon'
                        }
                    })
                    t.field('users', {
                        type: list("User"),
                        resolve(_p, _a, _c: iContext, _i) {
                            const { prisma } = _c
                            return prisma.user.findMany()
                        }
                    })
                    t.field('posts', {
                        type: list("Post"),
                        resolve(_p, _a, _c: iContext, _i) {
                            const { prisma } = _c
                            return prisma.post.findMany()
                        }
                    })
                },

            }
        ),
        mutationType({
            definition(t) {
                t.field('add_post', {
                    type: "Post",
                    args: {
                        id: stringArg(),
                        title: stringArg(),
                        desc: stringArg(),
                        author_id: stringArg()
                    },
                    resolve(_p, _a, _c: iContext, _i) {
                        const { prisma } = _c
                        const { id, title, desc, author_id } = _a

                        return prisma.post.create({
                            data: {
                                id: id!,
                                title: title!,
                                desc: desc!,
                                authorId: author_id!
                            }
                        })
                    }
                })
            }
        })
    ],
    shouldGenerateArtifacts: true, //process.env.NODE_ENV === 'dev'

    outputs: {
        // I tend to use `.gen` to denote "auto-generated" files, but this is not a requirement.
        schema: path.join(__dirname, 'gen', 'schema.gen.graphql'),
        typegen: path.join(__dirname, 'gen', 'nexusTypes.gen.ts'),
    },
})