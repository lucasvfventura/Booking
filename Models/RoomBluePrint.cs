using System.Collections.Generic;

namespace Booking.Models
{
    public class RoomBluePrint : IEntity
    {
        public string Id { get; set; }
        public RoomType RoomType { get; set; }
        public string Description { get; set; }
        
        //TODO: add pictures
        
        public List<RoomFeature> Features { get; set; }
        public string PropertyId { get; set; }
        public Property Property { get; set; }
        public int AdultGuests { get; set; }
        public int ChildGuests { get; set; }
    }

    public enum RoomType {Private, Shared, Suite}
}