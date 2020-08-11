using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable enable

namespace server.Models.ActivityModel
{
    public class Activity
    {
        /*  Note: Most Activity objects are generated implicitly
         *  as a side-effect to a user action
         *
         *  There are 3 use cases for this object:
         *      = Generic Ticket Activity:
         *          - Found in Iterable Widgets
         *          - Has a GenericValue & TicketID
         *          - Read and Message are null
         *      = Comment Activity:
         *          - Found in Ticket Modal
         *          - Equivalent of a Comment
         *          - Has Message
         *          - GenericValue/Read/TicketID are null
         *      = User Activity:
         *          - Found in Notifications Modal (unique to user)
         *          - Has a Message/TicketID/Read
         *          - GenericValue is null
         */

        [Key, Required, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        // Author is the Author's Tag
        [Required]
        public string Author { get; set; }

        [Required, DataType(DataType.DateTime)]
        public DateTime CreationDate { get; set; }

        [Required]
        public ActivityType Type { get; set; }

        // Nullable; only generics have this value. The
        // message is computed before being sent to the client based
        // on an internal enum
        public byte? GenericValue { get; set; }

        // Nullable; only comment activity objs have a message.
        // Comments have no ticketID
        public string? Message { get; set; }

        // Nullable; only present on generics, used to link to a ticket
        public int? TicketID { get; set; }

        // Nullable; only present on User activity objs (all of which are generic)
        public bool? Read { get; set; }

    }
}