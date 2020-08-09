using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models.TicketModel
{
    public class Ticket
    {
        [Key, Required, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        // Author is the Author's Tag
        [Required]
        public string Author { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required, DataType(DataType.DateTime)]
        public DateTime CreationDate { get; set; }

        [Required, DataType(DataType.DateTime)]
        public DateTime UpdateDate { get; set; }

        [Required]
        public short TypeLabel { get; set; }

        [Required]
        public short Reproducibility { get; set; }

        [Required]
        public short Severity { get; set; }

        [Required]
        public short Status { get; set; }

        // List of Tags
        [Required]
        public List<string> Assignees { get; set; }

        [Required]
        public List<string> ImageLinks { get; set; }

        // List of Activity Ids
        [Required]
        public List<int> Activity { get; set; }

        [Required]
        public short Comments { get; set; }
    }
}
