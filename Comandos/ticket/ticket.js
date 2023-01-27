const Discord = require("discord.js")

module.exports = {
  name: "tickets", // Coloque o nome do comando
  description: "Ative o sistema de ticket no servidor - DeluxeCodes.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal",
        description: "Mencione um canal de texto.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply(`Olá ${interaction.user}, você não possui permissão para utilizar este comando.`)
    } else {
        let canal = interaction.options.getChannel("canal");
        if (!canal) canal = interaction.channel;

        let embed_ephemeral = new Discord.EmbedBuilder()
        .setColor("Grey")
        .setDescription(`Olá ${interaction.user}, o sistema foi adicionado em ${canal} com sucesso.`);

        let emebd_tickets = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true}) })
        .setDescription(`Seja bem-vindo a nossa Central de Atendimento, escolha abaixo uma categoria de acordo com o problema que você tenha, assim você ira criar um chat aonde nossa equipe poderá ajuda-lo

Selecione a categoria que encaixa no seu problema!

 Horários de atendimento: 
 Segunda a Sábado das 7:00h ás 22:00h
 Prazo médio para atendimento: 4 horas`);

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("tickets_basico")
            .setEmoji("🎫")
            .setStyle(Discord.ButtonStyle.Primary)
        );
   

        interaction.reply({ embeds: [embed_ephemeral], ephemeral: true }).then( () => {
            canal.send({ embeds: [emebd_tickets], components: [botao] })
        })
    }


    
  }
}


    
  
