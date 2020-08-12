using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable enable

namespace server.Models.ActivityModel
{
    public class Activity
    {
        //  Note: Most Activity objects are generated implicitly
        //  as a side-effect to a user action
        
        [Key, Required, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        // Author is the Author's Tag
        [Required]
        public string Author { get; set; }

        [Required, DataType(DataType.DateTime)]
        public DateTime CreationDate { get; set; }

        [Required]
        public byte Type { get; set; }

        [Required]
        public int TicketID { get; set; }

        [Required]
        public string Old { get; set; }

        [Required]
        public string New { get; set; }

        [Required]
        public bool Read { get; set; }
    }
}