import streamClient from "../chat/client.js";
import { Project } from "../models/project.model.js";

const createChatRoom = async (projectId, projectName, members) => {
    try {
        const channel = streamClient.channel('team', `project_${projectId}`, {
            name: `Project: ${projectName}`,
            members, // Add the list of team members to the chat room
        });
        await channel.create();
       await channel.update({
            // Only team members can send messages
            permissions: {
                send: members,  // Only team members can send messages
            },
            // Only team members can view the channel (read access)
            read: members,  // Only team members can see the channel
        });
        console.log(`Chat room created for project: ${projectName}`);
    } catch (error) {
        console.error(`Failed to create chat room: ${error.message}`);
        throw new ApiError(500, `Failed to create chat room: ${error.message}`);
    }
};

const addUserToChatRoom = async (projectId, userId) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            throw new ApiError(404, "Project not found");
        }

        if (!userId) {
            throw new ApiError(400, "User ID is required");
        }

        const chatRoomId = `project_${projectId}`;
        const chatRoom = streamClient.channel('team', chatRoomId);

        // Ensure the channel exists before adding members
        const channelExists = await chatRoom.query();
        if (!channelExists) {
            throw new ApiError(404, "Chat room not found");
        }

        // Add the user to the chat room
        await chatRoom.addMembers([userId]);

        return { success: true, message: "User added to the chat room successfully" };
    } catch (error) {
        console.error("Error adding user to chat room:", error);
        throw new ApiError(500, `Failed to add user to chat room: ${error.message}`);
    }
};

const removeUserFromChatRoom = async (projectId, userId) => {
    try {
        const chatRoomId = `project_${projectId}`;
        const chatRoom = streamClient.channel('team', chatRoomId);

        // Check if the chat room exists
        const channelExists = await chatRoom.query();
        if (!channelExists) {
            throw new Error("Chat room not found");
        }

        // Remove the user from the chat room
        await chatRoom.removeMembers([userId]);
        console.log(`User with ID ${userId} removed from chat room for project ${projectId}`);
    } catch (error) {
        console.error("Error removing user from chat room:", error);
        throw new Error(`Failed to remove user from chat room: ${error.message}`);
    }
};


export {
    createChatRoom,
    addUserToChatRoom,
    removeUserFromChatRoom
}